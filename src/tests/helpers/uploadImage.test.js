import 'setimmediate';
import cloudinary from 'cloudinary';
import { uploadImage } from '../../helpers/uploadImage';

cloudinary.config({
  cloud_name: 'dqradtulc',
  api_key: '835855116472326',
  api_secret: 'GmvAq0I2T2oHUuWSFTXY-9ttZqU',
  secure: true
});

describe('Test para uploadImage', () => {

  test('Debe de subir una imagen', async () => {
    const resImg = await fetch('https://d500.epimg.net/cincodias/imagenes/2015/07/10/lifestyle/1436542079_444263_1436543394_noticia_normal.jpg');
    const blob = await resImg.blob();
    const img = new File([blob], 'photo.jpg');

    const res = await uploadImage(img, 'journal/tests');
    expect(typeof res.secure_url).toBe('string');

    const { deleted } = await cloudinary.v2.api.delete_resources(res.public_id);
    expect(deleted).toEqual({ [res.public_id]: 'deleted' });
  });

  test('Debe fallar la subida de la imagen', async () => {
    const img = new File([], 'photo.jpg');
    const res = await uploadImage(img, 'journal/tests');

    expect(res).toBe(null);
  });
});
