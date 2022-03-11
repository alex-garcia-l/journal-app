export const uploadImage = async (file) => {
  const baseUrl = 'https://api.cloudinary.com/v1_1/dqradtulc/image/upload';
  const data = new FormData();

  data.append('upload_preset', 'journal');
  data.append('folder', 'journal/images');
  data.append('file', file);
  
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: data
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  } catch (error) {
    throw error;
  }
}