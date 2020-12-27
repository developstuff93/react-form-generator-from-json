import React from "react";
import cx from "classnames";
import styles from "./ConfirmPage.module.scss";

function ConfirmPage({ answers }) {
  const answeredItems = answers && Object.entries(answers);
  const submitAnswers = () => {
    const formData = new FormData();
    answeredItems.forEach(([key, answer]) => {
      formData.append(answer.label, answer.value);
    });
    alert("Thank you for your submission");
    // Do Submit here
    // submit(formData);
  };

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <h2>Confirm Page</h2>
      </div>
      <div className={styles.Main}>
        <div className={styles.AnswerList}>
          <ul>
            {answeredItems &&
              answeredItems.map(([key, answer]) => (
                <li key={key}>{`${answer.label}: ${answer.value}`}</li>
              ))}
          </ul>
        </div>
        <div className={styles.SubmitButton}>
          <button
            className={cx(styles.IProButton, styles.Danger)}
            onClick={submitAnswers}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPage;
