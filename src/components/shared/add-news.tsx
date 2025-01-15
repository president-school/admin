import { useEffect, useRef, useState } from "react";
import { setNewsModalFun } from "../../utils/dispatch";

import { Button, Form, message, Progress, Upload } from "antd";
import LanguageForm from "../ui/index,";
import { useTranslation } from "react-i18next";
import {
  
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  GetFirebaseDataById,
  PostFirebaseData,
  UpdateData,
} from "../../firebase/services";
import { AddNewType, NewsResData } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { RcFile } from "antd/es/upload";
import { storage } from "../../firebase/config";
import { X } from "lucide-react";

export const AddNews = () => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLang, setActiveLang] = useState<"uz" | "de" | "en">("uz");
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const newsModalAction = useSelector(
    (state: RootState) => state.booleans.newsModal
  );

  const { data: formData } = GetFirebaseDataById(
    newsModalAction.path,
    newsModalAction.id
  );
  const [photos, setPhotos] = useState<string[] | undefined>([]);
  const [initialVideo, setInitialVideo] = useState<string | undefined>(
    undefined
  );
  const formInitialValue = (data: NewsResData | null) => {
    setPhotos(data?.uz.images);
    setInitialVideo(data?.uz.videos);
    return {
      title_uz: data?.uz.title,
      title_de: data?.de.title,
      title_en: data?.en.title,
      description_uz: data?.uz.description,
      description_de: data?.de.description,
      description_en: data?.en.description,
    };
  };

  useEffect(() => {
    if (newsModalAction.role === "edit")
      form.setFieldsValue(formInitialValue(formData));
  }, [formData, form]);
  //   ===========Modal Open Fun
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setNewsModalFun({
        role: "add",
        id: "",
        open: false,
        refresh: false,
        path: "",
        title: "",
      });
    }, 300);
  };

  const date = Date.now();
  const onChangeLang = (lang: "uz" | "en" | "de") => {
    setActiveLang(lang);
  };
  // submit Data Api

  const { loading, fetchingData, success } = PostFirebaseData(
    newsModalAction.path
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    fetchData,
  } = UpdateData(newsModalAction.path);

  if (success || updateSuccess) {
    setNewsModalFun({
      open: false,
      role: "add",
      id: "",
      refresh: true,
      path: "",
      title: "",
    });
  }

  // -----------------------------------------UPLOAD IMAGE

  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const isImage = (file: RcFile): boolean => {
    const imageTypes = ["image/jpeg", "image/png", "image/gif"];
    return imageTypes.includes(file.type);
  };

  const handleUpload = async () => {
    if (fileList.length == 0) return [];
    setUploading(true);
    try {
      const uploadPromises = fileList.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);
      return urls;

      // setImgUrl(urls);
    } catch (error) {
      console.error("Юклашда хато юз берди:", error);
      message.error("Файлларни юклашда хато юз берди. Қайта уриниб кўринг.");
      return [];
    } finally {
      setUploading(false);
    }
  };

  const props = {
    onRemove: (file: any) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    beforeUpload: (file: RcFile) => {
      if (!isImage(file)) {
        message.error(`Файл "${file.name}" расм форматида эмас.`);
        return false;
      }
      if (file.size / 1024 / 1024 > 100) {
        message.error(`Файл "${file.name}" 100MB дан ошмаслиги керак.`);
        return false;
      }
      setFileList((prev) => [...prev, file]);
      return false; // Автоматик юклашни олдини олади
    },
    fileList,
    multiple: true,
  };

  //-----------------------------------------UPLOAD Video
  const MAX_FILE_SIZE_MB = 100;
  const [progress, setProgress] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);

  const handleVideoUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!selectedFile) {
        // message.error("Юклаш учун файл танланмаган!");
        resolve(""); // Agar файл танланмаган бўлса, бўш строка қайтарилади
        return;
      }

      setVideoUploading(true);
      const storageRef = ref(storage, `videos/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (error) => {
          message.error(t("toast.post_err"));
          setVideoUploading(false);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setSelectedFile(null);
              setVideoUploading(false);
              resolve(url);
            })
            .catch((error) => {
              message.error(t("toast.post_err"));
              setVideoUploading(false);
              reject(error);
            });
        }
      );
    });
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setProgress(0);
  };

  const beforeUpload = (file: File) => {
    const isLtMaxSize = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
    if (!isLtMaxSize) {
      message.error(t("toast.videoSize"));
      return false;
    }
    if (selectedFile) {
      // message.error("Фақат битта файл танлаш мумкин!");
      return false;
    }
    setSelectedFile(file);
    return false;
  };
  // ------------------------------submit form

  const deletePhoto = (photo: string) => {
    const filterPhoto = photos?.filter((item) => item !== photo);
    setPhotos(filterPhoto);
  };

  const submit = async (data: AddNewType) => {
    const imgUrls = await handleUpload();
    const video = await handleVideoUpload();
    if (photos && photos.length > 0) {
      setPhotos([...photos, ...imgUrls]);
    }
    if (!initialVideo) {
      setInitialVideo(video);
    }
    const filterData = {
      en: {
        title: data.title_en,
        description: data.description_en,
        images: imgUrls,
        videos: video,
        date,
      },
      de: {
        title: data.title_de,
        description: data.description_de,
        images: imgUrls,
        videos: video,
        date,
      },
      uz: {
        title: data.title_uz,
        description: data.description_uz,
        images: imgUrls,
        videos: video,
        date,
      },
    };
    if (newsModalAction.role == "add") fetchingData(filterData);
    else fetchData(newsModalAction.id, filterData);
  };

  const [validateErr, setValidateErr] = useState([""]);

  useEffect(() => {
    if (validateErr.length > 1) message.error(t("toast.form_err"));
  }, [validateErr]);

  const errorClick = (data: any) => {
    setValidateErr([""]);
    const errors: Record<string, string> = {};
    data.errorFields?.forEach((field: any) => {
      errors[field.name[0]] = field.errors[0]; // Maydon nomi va xato xabarini olish
    });

    // setMissingFields(errors);

    // Obyekt ichidan yurish
    for (const [field] of Object.entries(errors)) {
      setValidateErr((item) => [...item, field.slice(field.length - 2)]);
    }
  };

  return (
    <div className="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div
        ref={wrapper}
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-100 z-10 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`w-[650px] h-auto max-h-[80vh] overflow-y-auto bg-white p-4 transform transition-transform duration-100 rounded-lg ${
            isVisible ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          {/* <Form> */}

          <>
            <div className="flex justify-between items-center mb-10 h-10 ">
              <p className="font-semibold text-2xl">{newsModalAction.title}</p>
              <X size={30} className="cursor-pointer" onClick={handleClose} />
            </div>
            <div className="flex gap-2 mb-4">
              {["uz", "de", "en"].map((lang) => (
                <Button
                  key={lang}
                  type={activeLang === lang ? "primary" : "default"}
                  onClick={() => onChangeLang(lang as "uz" | "de" | "en")}
                  className={`w-full ${
                    validateErr.includes(lang) ? "bg-red-500" : ""
                  } ${activeLang === lang ? "bg-blue-500" : ""} `}
                >
                  {t(`form.${lang}`)}
                </Button>
              ))}
            </div>
            <Form onFinish={submit} onFinishFailed={errorClick} form={form}>
              <LanguageForm
                name="title"
                label={t("form.news_name")}
                error={true}
                errorMessage={t("form.validation.name")}
                lang={activeLang}
              />
              <LanguageForm
                name="description"
                label={t("form.desc")}
                error={true}
                errorMessage={t("form.validation.desc")}
                lang={activeLang}
                inputType="textAria"
              />
              <div className="mb-5">
                <Form.Item
                  name="img"
                  rules={[
                    {
                      required: true,
                      message: t("form.validation.img"),
                    },
                  ]}
                >
                  <Upload
                    {...props}
                    listType="picture"
                    // beforeUpload={() => false}
                    fileList={fileList}
                    className="w-full mb-4"
                    disabled={
                      uploading || loading || videoUploading || updateLoading
                    }
                  >
                    <Button
                      icon={<UploadOutlined />}
                      className="w-[620px]"
                      disabled={
                        uploading || loading || videoUploading || updateLoading
                      }
                    >
                      {t("form.photo")}
                    </Button>
                  </Upload>
                </Form.Item>
                {newsModalAction.role == "edit" && (
                  <div className="flex my-2 gap-2 flex-wrap">
                    {photos?.map((item: string) => {
                      return (
                        <div className="relative">
                          <img src={item} alt="" className="w-[100px]" />
                          <span
                            className="w-5 h-5 bg-red-500 rounded-full absolute top-2 right-2 flex justify-center items-center text-white cursor-pointer"
                            onClick={() => deletePhoto(item)}
                          >
                            X
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="mb-10">
                <Upload
                  accept="video/*"
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                  disabled={
                    initialVideo && initialVideo?.length > 0 ? true : false
                  }
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    className="w-[620px]"
                    disabled={
                      selectedFile || (initialVideo && initialVideo?.length > 0)
                        ? true
                        : false
                    }
                  >
                    Видео юклаш
                  </Button>
                </Upload>
                {(initialVideo && initialVideo?.length > 0) ||
                  (selectedFile && (
                    <div style={{ marginTop: "20px" }}>
                      <p>Танланган файл: {selectedFile.name}</p>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={handleRemove}
                        danger
                        type="primary"
                        disabled={videoUploading}
                      >
                        Файлни ўчириш
                      </Button>
                    </div>
                  ))}
                {initialVideo && initialVideo?.length > 0 && (
                  <Button
                    type="primary"
                    className="bg-red-500 mt-2"
                    onClick={() => setInitialVideo("")}
                  >
                    videoni o'chirish
                  </Button>
                )}
                {progress > 0 && (
                  <Progress percent={progress} style={{ marginTop: "20px" }} />
                )}
              </div>

              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                loading={
                  uploading || loading || videoUploading || updateLoading
                }
                onClick={errorClick}
              >
                {t("submit")}
              </Button>
            </Form>
          </>
        </div>
      </div>
    </div>
  );
};
