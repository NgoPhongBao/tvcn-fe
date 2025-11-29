import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  className: string;
  de1: number;
  de2: number;
  de3: number;
  khauLenh: number;
};

const URL = "http://localhost:4000/submit-form";
// const URL = "http://localhost:4000/submit-form";

export default function App() {
  const [status, setStatus] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      className: "",
      de1: 0,
      de2: 0,
      de3: 0,
      khauLenh: 0,
    },
  });

  const submit: SubmitHandler<FormValues> = async (form) => {
    setStatus("Đang gửi... (chờ server xử lý và quay video)");
    setDownloading(false);
    setIsDisabled(true);
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        if (!data.ok) {
          setStatus(data.message || "Lỗi server");
          return;
        }
        setStatus("Hoàn thành — không có file video trả về.");
        return;
      }

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `record-${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setStatus("Hoàn tất — file video đã được tải về.");
        setDownloading(true);
      } else {
        const txt = await res.text();
        setStatus("Lỗi: " + txt);
      }
    } catch (err) {
      console.error(err);
      setStatus("Không thể kết nối server.");
    } finally {
      // setIsDisabled(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1 text-center">
          Từ vựng chuyên ngành
        </h1>

        <p className="text-sm text-slate-500 text-center mb-6">
          Vui lòng điền thông tin bên dưới
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {!isDisabled && (
            <>
              {" "}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Tên
                </label>
                <input
                  {...register("name", { required: "Tên là bắt buộc" })}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  placeholder="Nhập tên"
                  disabled={isDisabled}
                  autoComplete="off"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Lớp
                </label>
                <input
                  {...register("className", { required: "Lớp là bắt buộc" })}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  placeholder="Nhập lớp"
                  disabled={isDisabled}
                  autoComplete="off"
                />
                {errors.className && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.className.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Đề 1 (200 câu)
                  </label>
                  <input
                    {...register("de1", { required: "Đề 1 là bắt buộc" })}
                    placeholder="Nhập số câu trả lời đúng"
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                    type="number"
                    min={0}
                    max={200}
                    disabled={isDisabled}
                    autoComplete="off"
                  />
                  {errors.de1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.de1.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Đề 2 (213 câu)
                  </label>
                  <input
                    {...register("de2", { required: "Đề 2 là bắt buộc" })}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                    type="number"
                    placeholder="Nhập số câu trả lời đúng"
                    min={0}
                    max={213}
                    disabled={isDisabled}
                    autoComplete="off"
                  />
                  {errors.de2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.de2.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Đề 3 (270 câu)
                  </label>
                  <input
                    {...register("de3", { required: "Đề 3 là bắt buộc" })}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                    type="number"
                    placeholder="Nhập số câu trả lời đúng"
                    min={0}
                    max={270}
                    disabled={isDisabled}
                    autoComplete="off"
                  />
                  {errors.de3 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.de3.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Khẩu lệnh (41 câu)
                  </label>
                  <input
                    {...register("khauLenh", {
                      required: "Khẩu lệnh là bắt buộc",
                    })}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                    type="number"
                    placeholder="Nhập số câu trả lời đúng"
                    min={0}
                    max={41}
                    disabled={isDisabled}
                    autoComplete="off"
                  />
                  {errors.khauLenh && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.khauLenh.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center gap-3">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
                >
                  OK
                </button>
              </div>
            </>
          )}

          <div className="text-lg text-slate-600 text-center font-bold">
            {status}
          </div>
          {/* <div className="mt-6 text-center text-sm text-slate-700">
            Tùy lòng hảo tâm:
            <div className="mt-1 font-semibold">
              0977480791 (momo hoặc vpbank)
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}
