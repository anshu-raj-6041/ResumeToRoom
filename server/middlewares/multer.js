import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")      // public nam se destination add kr diya
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename)
    }
})


// file public me upload hoga
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },        // 5MB limit
});