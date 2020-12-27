import React from "react";
import styles from "./Options.moduie.scss";

function Options({ label, options, answer, onChange }) {
  const onOptionChange = (questionID) => (event) => {
    const { value } = event.target;
    onChange({ id: questionID, value, label });
  };
  return (
    <>
      {options.map((option) => {
        const {
          QuestionID: questionID,
          QuestionOptionID: id,
          Description: description
        } = option;
        return (
          <div key={id} className={styles.Root}>
            <input
              type="radio"
              name={questionID}
              id={id}
              value={description}
              checked={description === answer}
              onChange={onOptionChange(questionID)}
            />
            <label htmlFor={id}>{description}</label>
          </div>
        );
      })}
    </>
  );
}

export default Options;
