import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSigningURL } from "../hooks/useSignature";

const DS_BUNDLE = "https://js-d.docusign.com/bundle.js";
// عند الانتقال للإنتاج استبدله بـ
// https://js.docusign.com/bundle.js

const DS_INTEGRATION_KEY = import.meta.env.VITE_DS_INTEGRATION_KEY;

function loadDocuSignScript() {
  return new Promise((resolve, reject) => {
    if (window.DocuSign) {
      resolve(window.DocuSign);
      return;
    }

    const script = document.createElement("script");
    script.src = DS_BUNDLE;
    script.async = true;

    script.onload = () => resolve(window.DocuSign);

    script.onerror = () => reject(new Error("Failed to load DocuSign JS"));

    document.body.appendChild(script);
  });
}

export default function SignatureIframePage() {
  const navigate = useNavigate();

  const location = useLocation();

  const signature_request_id = location.state?.signature_request_id;

  const return_url = location.state?.return_url;

  const { data, isLoading, isError } = useSigningURL({
    return_url,
    signature_request_id,
  });

  const signingURL = data?.data?.signing_url;

  const [error, setError] = useState("");

  useEffect(() => {
    if (!signingURL) return;

    let signingInstance;

    const init = async () => {
      try {
        const DocuSign = await loadDocuSignScript();

        const docusign = await DocuSign.loadDocuSign(DS_INTEGRATION_KEY);

        signingInstance = docusign.signing({
          url: signingURL,

          displayFormat: "focused",

          style: {
            branding: {
              primaryButton: {
                backgroundColor: "#2563eb",
                color: "#ffffff",
              },
            },

            signingNavigationButton: {
              finishText: "إنهاء التوقيع",
              position: "bottom-center",
            },
          },
        });

        signingInstance.on("ready", () => {
          console.log("DocuSign Ready");
        });

        signingInstance.on("sessionEnd", (event) => {
          console.log(event);

          switch (event.sessionEndType) {
            case "signing_complete":
              alert("تم التوقيع بنجاح");

              navigate("/signature_requests");

              break;

            case "decline":
              alert("تم رفض التوقيع");
              navigate(-1);
              break;

            case "cancel":
              navigate(-1);
              break;

            case "ttl_expired":
              alert("انتهت صلاحية رابط التوقيع");
              navigate(-1);
              break;

            default:
              navigate(-1);
          }
        });

        signingInstance.mount("#ds-agreement");
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    init();

    return () => {
      if (signingInstance?.unmount) {
        signingInstance.unmount();
      }
    };
  }, [signingURL, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        جارٍ تحميل واجهة التوقيع...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        فشل في جلب رابط التوقيع.
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white">
      <div id="ds-agreement" className="h-full w-full" />
    </div>
  );
}
