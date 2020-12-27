import React, { useState, useEffect } from "react";
import cx from "classnames";

import QuestionPage from "./QuestionPage";
import ConfirmPage from "./ConfirmPage";
import styles from "./App.module.scss";
import formData from "../public/data/form.json";

export default function App() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [pagesData, setPagesData] = useState([]);

  const gotoPrevPage = () => {
    if (page) {
      setPage(page - 1);
    }
  };

  const gotoNextPage = () => {
    if (page < pagesData.length) {
      setPage(page + 1);
    }
  };

  const onUpdateAnswersList = (data) => {
    const { id, value, label } = data;
    if (!id) return;
    const newAnswer = { value, label };
    setAnswers({
      ...answers,
      [id]: newAnswer
    });
  };

  useEffect(() => {
    const apiResponseSimluator = (ms) => {
      return new Promise((doSomething) => setTimeout(doSomething, ms));
    };
    const fetchData = async () => {
      setLoading(true);
      await apiResponseSimluator(2000);
      setLoading(false);
      setPagesData(formData);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.Root}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!pagesData.length) {
    return <div className={styles.Root}>No Data</div>;
  }

  return (
    <div className={styles.Root}>
      <div className={styles.Main}>
        {!pagesData.length && <h2>Loading...</h2>}
        {page < pagesData.length && (
          <QuestionPage
            pageData={pagesData[page]}
            progress={(page / pagesData.length) * 100}
            answers={answers}
            onChange={onUpdateAnswersList}
          />
        )}
        {page === pagesData.length && <ConfirmPage answers={answers} />}
      </div>
      <div className={styles.ProgressIndicator}>
        <div className={styles.Button}>
          {page >= 1 && (
            <button
              className={cx(styles.IProButton, styles.Primary)}
              disabled={page < 1}
              onClick={gotoPrevPage}
            >
              Previous
            </button>
          )}
        </div>
        <div className={styles.Button}>
          {page < pagesData.length && (
            <button
              className={cx(styles.IProButton, styles.Primary)}
              onClick={gotoNextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
