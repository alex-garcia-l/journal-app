export const uploadImage = async (file, path = 'journal/images') => {
  const baseUrl = 'https://api.cloudinary.com/v1_1/dqradtulc/image/upload';
  const data = new FormData();

  data.append('upload_preset', 'journal');
  data.append('folder', path);
  data.append('file', file);
  
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: data
    });

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}