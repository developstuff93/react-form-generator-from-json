import React from "react";
import Options from "../QuestionOption";
import styles from "./Section.module.scss";

const UI_TYPE = {
  LABEL: "lb",
  CHECK_BOX: "cb",
  TEXT_BOX: "tb",
  RADIO_BUTTON: "rbil"
};

function Question({ questionData, onChange, answers }) {
  const { UI: type, Label: label, QuestionID: id } = questionData;
  const answer = answers[id] && answers[id].value;

  const onInputChange = (event) => {
    const { id, type } = event.target;
    let value;
    switch (type) {
      case "checkbox":
        value = event.target.checked;
        break;
      case "textbox":
      default:
        value = event.target.value;
        break;
    }
    onChange({ id, label, value });
  };

  switch (type) {
    case UI_TYPE.CHECK_BOX:
      return (
        <div className={styles.CheckBox}>
          <input
            type="checkbox"
            id={id}
            onChange={onInputChange}
            value=""
            checked={answer || false}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      );
    case UI_TYPE.TEXT_BOX:
      return (
        <div className={styles.TextBox}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type={"text"}
            onChange={onInputChange}
            value={answer || ""}
          />
        </div>
      );
    case UI_TYPE.RADIO_BUTTON:
      return (
        <div className={styles.Options}>
          <label>{label}</label>
          <Options
            label={label}
            options={questionData["Options"]}
            answer={answer}
            onChange={onChange}
          />
        </div>
      );
    case UI_TYPE.LABEL:
    default:
      return <label>{label}</label>;
  }
}

function Section({ sectionData, onChange, answers }) {
  const { Questions: questions } = sectionData;
  return (
    <div className={styles.Root}>
      {questions &&
        questions.map((question) => (
          <div key={question["QuestionID"]} className={styles.Question}>
            <Question
              questionData={question}
              onChange={onChange}
              answers={answers}
            />
          </div>
        ))}
    </div>
  );
}

export default Section;
