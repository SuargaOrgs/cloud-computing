const prisma = require('../../helpers/prisma');
const { handleImageUpload, deleteImageStorage } = require('../../helpers/storageImages');
const { verifyToken } = require('../../middlewares/jwt');
const { formatDateText } = require('../../helpers/formatDate');
// const tf = require('@tensorflow/tfjs-node');

// class L2 extends tf.regularizers.l1l2 {
//     constructor(config) {
//         super(config);
//         this.l2 = config.l2;
//     }

//     apply(x) {
//         return tf.mul(this.l2, tf.sum(tf.square(x)));
//     }

//     getConfig() {
//         return { l2: this.l2 };
//     }

//     static get className() {
//         return 'L2';
//     }
// }

// tf.serialization.registerClass(L2);


// SERVICE API 

const getData = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const nutrition = await prisma.imageNutrition.findMany({
            where: { idUser: verify.idUser },
            select: {
                id: true,
                idUser: true,
                idMakanan: true,
                gambar: true,
                makanan: { select: { namaMakanan: true } },
                waktuMakan: true,
                created_at: true
            }
        });

        if (nutrition.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Data nutrition not found",
                data: []
            };
        }

        const formatData = nutrition.map((item) => {
            return {
                id: item.id,
                idUser: item.idUser,
                gambar: item.gambar,
                namaMakanan: item.makanan.namaMakanan,
                keterangan: item.waktuMakan + " | " + formatDateText(item.created_at),
                created_at: item.created_at
            }
        }).sort((a, b) => b.created_at - a.created_at);

        return {
            status: 200,
            error: false,
            message: "Data nutrition has been found",
            data: formatData
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Data nutrition gagal diambil',
            data: error.message
        };
    }
};

const detailData = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        }
    }

    try {
        const nutrition = await prisma.imageNutrition.findMany({
            where: { idUser: verify.idUser },
            select: {
                id: true,
                idUser: true,
                idMakanan: true,
                gambar: true,
                waktuMakan: true,
                makanan: {
                    select: {
                        namaMakanan: true,
                        karbohidrat: true,
                        lemak: true,
                        protein: true,
                    }
                },
                updated_at: true,
                created_at: true,
            }
        });

        if (nutrition.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Detail nutrition not found",
                data: []
            };
        }

        const formatData = nutrition.map((item) => ({
            id: item.id,
            idUser: item.idUser,
            idMakanan: item.idMakanan,
            gambar: item.gambar,
            waktuMakan: item.waktuMakan,
            namaMakanan: item.makanan.namaMakanan,
            karbohidrat: item.makanan.karbohidrat,
            lemak: item.makanan.lemak,
            protein: item.makanan.protein,
            update_at: item.updated_at,
            created_at: item.created_at
        })).sort((a, b) => b.created_at - a.created_at);

        return {
            status: 200,
            error: false,
            message: "Detail nutrition has been found",
            data: formatData
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Detail nutrition gagal diambil',
            data: error.message
        };
    }
};

const saveImageNutrition = async (data) => {
    const { token, linkGambar, namaAktivitas, waktuMakan, idMakanan, porsi } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const imageNutrition = await prisma.imageNutrition.create({
            data: {
                idUser: verify.idUser,
                idMakanan,
                NamaAktivitas: namaAktivitas,
                gambar: linkGambar,
                waktuMakan,
                porsi : parseInt(porsi)
            }
        });

        return {
            status: 201,
            error: false,
            message: "Image nutrition data has been saved",
            data: imageNutrition
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Failed to save image nutrition data',
            data: error.message
        };
    }
};

const getFoodStorage = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const foodStorage = await prisma.foodStorage.findMany();

        if (foodStorage.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Food storage not found",
                data: []
            };
        }

        return {
            status: 200,
            error: false,
            message: "Food storage data has been found",
            data: foodStorage
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Failed to retrieve food storage data',
            data: error.message
        };
    }
};

// const predictImage = async (data) => {

//     const { token, file } = data;

//     const verify = verifyToken(token)

//     if (!verify) {
//         return {
//             status: 401,
//             error: true,
//             message: "Session has expired, please login again!!"
//         }

//     }

//     try {

//         const model = await tf.loadLayersModel('https://storage.googleapis.com/bucket-suarga-app/model/modelNW.json');

//         const imageBuffer = file.buffer;
//         const tensor = tf.node.decodeImage(imageBuffer, 3)
//             .resizeNearestNeighbor([299, 299])
//             .expandDims()
//             .toFloat()
//             .div(tf.scalar(255.0));

//         const prediction = await model.predict(tensor).data();

//         const index = prediction.indexOf(Math.max(...prediction));

//         const indexValue = prediction[index];

//         if (indexValue < 0 && indexValue > 1) {
//             return {
//                 status: 400,
//                 error: true,
//                 message: 'Upload atau Prediksi Gagal',
//                 indexValue: indexValue,
//             };
//         } else if (indexValue < 0.5) {
//             return {
//                 status: 400,
//                 error: true,
//                 message: 'Prediksi Gagal, Gambar tidak terdeteksi',
//                 indexValue: indexValue,
//             };
//         }

//         const dataMakanan = await prisma.foodStorage.findMany({
//             select: {
//                 id: true,
//                 namaMakanan: true,
//             }
//         });

//         const dataMakananCategory = dataMakanan.reduce((acc, curr, index) => {
//             acc[index] = [curr.namaMakanan.toLowerCase().split(' ').join('-'), curr.namaMakanan];
//             return acc;
//         }, {});

//         // console.log("Data Makanan Category : ", dataMakananCategory);

//         let predictionResult = dataMakananCategory[index][1];
//         let slugResult = dataMakananCategory[index][0];

//         const dataNutrition = await prisma.foodStorage.findFirst({
//             where: {
//                 namaMakanan: predictionResult
//             }
//         })

//         if (!dataNutrition) {
//             return {
//                 status: 400,
//                 error: true,
//                 message: 'Data Nutrition tidak ditemukan',
//             }
//         }

//         // console.log("Data Nutrition : ", dataNutrition);

//         return {
//             status: 200,
//             error: false,
//             message: "Upload Gambar Berhasil dan Prediksi Selesai",
//             data: {
//                 // prediction: prediction,
//                 // index: index,
//                 // category: predictionResult,
//                 nutrition: {
//                     id: dataNutrition.id,
//                     namaMakanan: dataNutrition.namaMakanan,
//                     karbohidrat: dataNutrition.karbohidrat,
//                     lemak: dataNutrition.lemak,
//                     protein: dataNutrition.protein,
//                     vitamin: dataNutrition.vitamin
//                 },
//                 indexValue: indexValue,
//                 slugResult: slugResult,
//                 file: file,
//             }
//         };

//     } catch (error) {

//         return {
//             status: 400,
//             error: true,
//             message: 'Prediksi Gagal, Gambar tidak terdeteksi',
//             errorMessage: error.message,
//         };

//     }

// }

// const uploadData = async (data) => {

//     const { token, file, slugResult, waktuMakan, porsi, namaAktivitas } = data;

//     const verify = verifyToken(token)

//     if (!verify) {
//         return {
//             status: 401,
//             error: true,
//             message: "Session has expired, please login again!!"
//         }
//     }

//     try {

//         const uploadImageStorage = await handleImageUpload(file, slugResult);

//         const namaMakanan = slugResult.split('-').join(' ');

//         const dataNutrition = await prisma.foodStorage.findFirst({
//             where: {
//                 namaMakanan: namaMakanan
//             }
//         })

//         if (!dataNutrition) {
//             return {
//                 status: 400,
//                 error: true,
//                 message: 'Data Nutrition tidak ditemukan',
//             }
//         }

//         try {
//             await prisma.imageNutrition.create({
//                 data: {
//                     idUser: verify.idUser,
//                     idMakanan: dataNutrition.id,
//                     NamaAktivitas: namaAktivitas,
//                     gambar: uploadImageStorage.publicUrl,
//                     waktuMakan: waktuMakan,
//                     porsi: parseInt(porsi),
//                 }
//             })
//         } catch (error) {
//             await deleteImageStorage(uploadImageStorage.publicUrl);
//             return {
//                 status: 400,
//                 error: true,
//                 message: 'Terjadi Masalahh saat Upload Data, Lakukan Upload Ulang!!',
//                 errorMessage: error.message,
//             };
//         }

//         return {
//             status: 200,
//             error: false,
//             message: "Upload data Berhasil",
//             data: {
//                 imageUrl: uploadImageStorage.publicUrl,
//                 dataNutrition: dataNutrition,
//                 slugResult: slugResult,
//                 waktuMakan: waktuMakan,
//                 porsi: porsi,
//                 namaAktivitas: namaAktivitas
//             }
//         };

//     } catch (error) {

//         return {
//             status: 400,
//             error: true,
//             message: 'Upload Gagal, Lakukan Upload Ulang!!',
//             errorMessage: error.message,
//         };

//     }
// }

module.exports = {
    getData,
    detailData,
    // uploadData,
    // predictImage,
    saveImageNutrition,
    getFoodStorage
};
