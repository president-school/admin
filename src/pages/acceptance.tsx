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
  const langues: "uz" | "de" | "en" = useSelector(
    (state: RootState) => state.booleans.langue
  );
  const { data, refresh } = GetFirebaseData<AcceptanceType[]>("text");
  const filter = data.map((item: any) => {
    return { ...item.text[`${langues}`], id: item.id };
  });
  // console.log(filter[0].text);

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
              text: "",
              open: true,
              refresh: false,
            })
          }
        >
          {t("news.modal_edit")}
        </Button>
      </div>
      <div
        className="text-justify h-[91vh] overflow-x-scroll"
        dangerouslySetInnerHTML={{
          __html: filter[0]?.text,
        }}
      ></div>
    </main>
  );
};
