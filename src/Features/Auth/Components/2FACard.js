import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { loginRequest, verify2FARequest } from "../Services/AuthApi";
import { setError, setLoading, setUserDetails } from "../AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { Typography } from "@mui/material";

export default function Verify2fa() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const { error } = useAuth();
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const temData = JSON.parse(sessionStorage.getItem("temp_data"));

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    let newCode = code.split("");

    while (newCode.length < 7) newCode.push("");

    newCode[index] = value;

    setCode(newCode.join(""));

    if (value && index < 6) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  //  Resend
  const handleResend = async () => {
    if (!canResend) return;
    dispatch(setLoading(true));
    try {
      const data = await loginRequest(temData);
      sessionStorage.setItem("temp_auth", JSON.stringify(data));
      setTimeLeft(30);
      setCanResend(false);
      setCode("");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const tempAuth = JSON.parse(sessionStorage.getItem("temp_auth"));
    try {
      const data = await verify2FARequest({
        code,
        temporary_token: tempAuth.temporary_token,
        user_id: tempAuth.user_id,
      });

      dispatch(setUserDetails(data));
      cookies.set("auth", data);

      sessionStorage.removeItem("temp_token");

      navigate("/dashboard");
      // if (data.user.role === "office_admin") {
      //   navigate("/cases");
      // } else {
      //   navigate("/settings");
      // }
    } catch (err) {
      console.log(err.response);
      dispatch(setError(err.response.data?.data?.message));
      setTimeout(() => {
        dispatch(setError(null));
      }, 5000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* verification Card */}
      <div className="w-[400px] rounded-2xl bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">
        {/* Header */}
        <div className="text-center pb-6 w-[318px]">
          <div className="w-14 h-12 mx-auto pb-3 pt-3 rounded-full bg-gray-200 flex items-center justify-center">
            🛡️
          </div>
          <h1 className="text-xl font-bold text-gray-800 h-6 mt-7">
            التحقق بخطوتين
          </h1>
          <p className="text-gray-500 text-sm">
            تم إرسال رمز تحقق إلى بريدك الإلكتروني <span>{temData.email}</span>{" "}
            يرجى إدخال رمز المتابعة
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleVerify} className="flex flex-col gap-7 pb-4">
          <div className="flex flex-row-reverse justify-between gap-2 mb-6">
            {[...Array(7)].map((_, index) => (
              <input
                required
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                dir="ltr"
                value={code[index] || ""}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-10 h-12 text-center text-lg rounded-xl border border-gray-200 bg-white shadow-sm focus:border-[#3f4b7f] outline-none"
              />
            ))}
          </div>
          {/* Timer + Resend */}
          <div className="text-center mt-5 text-sm">
            {!canResend ? (
              <span className="text-gray-500">
                إعادة الإرسال خلال{" "}
                <span className="text-[#3f4b7f] font-semibold">
                  {timeLeft}s
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-500 hover:underline"
              >
                إعادة إرسال الرمز
              </button>
            )}
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-[#3f4b7f] hover:bg-[#2f3a66] text-white py-3 rounded-xl transition"
          >
            تأكيد⬅
          </button>
        </form>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}

        {/* Badges */}
        <div className="flex justify-center gap-4 text-xs pt-8">
          <span className="bg-[#D6E3FB] text-blue-600 px-4 py-1 rounded-full">
            نظام معتمد
          </span>
          <span className="bg-[#E1E3E4] px-4 py-1 rounded-full text-gray-600">
            BIT-256 تشفير
          </span>
        </div>
      </div>
    </div>
  );
}
