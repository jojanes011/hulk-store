import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_UPLOAD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_UPLOAD,
  region: 'us-east-1',
  signatureVersion: 'v4',
});

const downloadUrl = async () => null;

// const downloadUrl = async (file, type = 'image') => {
//   let key = null;
//   if (file !== null) {
//     key = file.split('.s3.amazonaws.com/')[1];
//   }
//   const newUrl: string =
//     key != null
//       ? await s3.getSignedUrl('getObject', {
//           Bucket: process.env.BUCKET_NAME,
//           Key: decodeURIComponent(key),
//           Expires: 2000,
//           ResponseContentType:
//             type === 'image'
//               ? 'image/x-png,image/gif,image/jpeg'
//               : 'application/octet-stream',
//         })
//       : null;
//   return newUrl as string;
// };

export default downloadUrl;
