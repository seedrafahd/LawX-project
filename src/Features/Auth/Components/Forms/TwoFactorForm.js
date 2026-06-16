import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { loginRequest, verify2FARequest } from "../../services/AuthApi";
import { setError, setLoading, setUserDetails } from "../../AuthSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Typography } from "@mui/material";
import AuthButton from "../AuthButton";
import AuthFormCard from "../AuthFormCard";
import GppGoodIcon from "@mui/icons-material/GppGood";

export default function TwoFactorForm() {
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
    // <div className="min-h-screen flex items-center justify-center">
    <AuthFormCard
      onSubmit={handleVerify}
      icon={<GppGoodIcon />}
      title="التحقق بخطوتين"
      subtitle={
        <>
          تم إرسال رمز تحقق إلى بريدك الإلكتروني <span>{temData.email}</span>{" "}
          يرجى إدخال رمز المتابعة
        </>
      }
    >
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

      <div className="text-center mt-5 text-sm">
        {!canResend ? (
          <span className="text-gray-500">
            إعادة الإرسال خلال{" "}
            <span className="text-[#3f4b7f] font-semibold">{timeLeft}s</span>
          </span>
        ) : (
          <AuthButton type="button" variant="text" onClick={handleResend}>
            إعادة إرسال الرمز
          </AuthButton>
        )}
      </div>

      <AuthButton type="submit" className="shadow-none">
        تأكيد⬅
      </AuthButton>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </AuthFormCard>
    // </div>
  );
}
