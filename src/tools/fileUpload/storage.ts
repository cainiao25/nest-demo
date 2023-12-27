import * as multer from "multer";
import * as fs from 'fs';
import * as path from "path";

// 创建一个 multer 磁盘存储配置对象，用来指定文件存储的方式。
const storage = multer.diskStorage({
    // `destination` 是一个由 multer 使用的函数，用来确定上传文件存储的位置。
    destination: function (req, file, cb) {
        try {
            // 尝试通过同步方式在指定路径创建一个新的上传文件夹。
            // `process.cwd()` 返回 Node.js 进程的当前工作目录。
            // `path.join()` 方法用来连接 `process.cwd()` 和 'my-uploads'，构造一个完整的路径。
            fs.mkdirSync(path.join(process.cwd(), 'my-uploads'));
        } catch(e) {
            // 如果目录已经存在，捕获异常，此处忽略异常，因为这意味着上传目录已经存在。
        }

        // 通过调用 multer 的回调函数来继续文件保存过程。
        // 第一个参数是 null，表示没有发生错误。
        // 第二个参数是文件应该存储的目录路径。
        cb(null, path.join(process.cwd(), 'my-uploads'))
    },
    // `filename` 是一个由 multer 使用的函数，用来确定上传文件的文件名。
    filename: function (req, file, cb) {
        // 为文件名创建一个独特的后缀，以避免命名冲突，并确保文件名的唯一性。
        // 它包括当前时间戳、一个随机数和原始文件名。
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;

        // 通过调用回调函数，无错误地继续文件保存过程，并传入新的文件名。
        // `file.fieldname` 是表单字段的名称（在表单的 input 标签中指定）。
        // `uniqueSuffix` 被添加以确保文件名的唯一性。
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

export { storage };
