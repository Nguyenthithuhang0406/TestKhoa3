import { i18n } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources:{
        Vietnam:{
            translation:{
                name: 'Danh sách công việc của bạn',
                all: "Tất cả",
                active: "Đang làm",
                complete: "Đã hoàn thành",
                add: "Thêm",
                delete: "Xoá",
                placehoder: "Thêm công việc",
                sort: "Sắp xếp",
                default: "Mặc định",
                increase: "Tăng dần A-Z",
                decrease: "Giảm dần Z-A",
            },
        },
        English:{
            translation:{
                name: 'ToDoList',
                all: "All",
                active: "Active",
                complete: "Complete",
                add: "Add",
                delete: "Delete",
                placehoder: "Enter a new task",
                sort: "Sort",
                default: "Default",
                increase: "Increase A-Z",
                decrease: "Decrease Z-A",
            },
        },
    },
    fallbackLng: 'English', 
    interpolation: {
        escapeValue: false, 
    },
});

export default i18n;