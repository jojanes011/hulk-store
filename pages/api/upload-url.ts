import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_UPLOAD,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_UPLOAD,
    region: 'us-east-1',
    signatureVersion: 'v4',
  });

  const Conditions = [
    { bucket: process.env.BUCKET_NAME },
    ['content-length-range', 0, 10485760],
  ];

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    Expires: 60, // seconds
    Conditions,
  });
  const finalURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${post.fields.key}`;
  res.status(200).json({ post, finalURL });
}
