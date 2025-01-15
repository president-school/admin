import { Button } from "antd";

import { useTranslation } from "react-i18next";

import { GetFirebaseData } from "../firebase/services";
import { AcceptanceType } from "../utils/types";
import { AcceptanceModal } from "../utils/dispatch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Acceptance = () => {
  const { t } = useTranslation();
  const modalAction = useSelector(
    (state: RootState) => state.booleans.acceptanceModal
  );
  const { data, refresh } = GetFirebaseData<AcceptanceType[]>("text");
  useEffect(() => {
    if (modalAction.refresh) {
      refresh();
    }
  }, [modalAction]);
  return (
    <main className="w-full p-10">
      <div className="flex justify-end mb-5">
        <Button
          type="primary"
          onClick={() =>
            AcceptanceModal({
              text: data[0].text,
              open: true,
              refresh: false,
            })
          }
        >
          {t("news.modal_edit")}
        </Button>
      </div>
      <div
        className=" text-justify"
        dangerouslySetInnerHTML={{
          __html: data[0]?.text,
        }}
      ></div>
    </main>
  );
};
