const uploadFile = async (path, file, nameFile) => {
  const filename = `${path}/${encodeURIComponent(nameFile)}`;
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const {
    post: { url, fields },
    finalURL,
  } = await res.json();
  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    const valueAny: any = value;
    formData.append(key, valueAny);
  });
  const s3UploadResponse = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  if (s3UploadResponse) {
    return finalURL;
  }
  return null;
};

const uploadFormFiles = async (formData, path, nameFile) => {
  const formDataCopy = { ...formData };
  await Promise.all(
    Object.keys(formDataCopy).map(async (el) => {
      if (
        Object.prototype.isPrototypeOf.call(File.prototype, formDataCopy[el])
      ) {
        const routeUpload = await uploadFile(path, formDataCopy[el], nameFile);
        formDataCopy[el] = routeUpload;
      }
    })
  );
  return formDataCopy;
};

export { uploadFormFiles, uploadFile };
