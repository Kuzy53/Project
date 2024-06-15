import React, { useState, useEffect } from 'react';
import { useGetLessonsQuery, usePostLessonsMutation } from '../api/userApi';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Input,
  MantineProvider
} from '@mantine/core';
import '@mantine/core/styles/PasswordInput.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/Checkbox.css';
import s from './LessonPage.module.css';
import '@mantine/core/styles/global.css';
import { useNavigate, useParams } from 'react-router-dom';

// Компонент для теста с type: 1
// Компонент для теста с type: 1
function TestType1({ content, answers, errorComment, onSubmit }) {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
  
    const handleCheckboxChange = (index) => {
      setSelectedAnswers((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };
  
    const handleSubmit = () => {
      onSubmit({
        answers,
        correct_answers: selectedAnswers
      });
    };
  
    return (
      <div className={s.quiz_item}>
        <h1>{content}</h1>
        <div className={s.answer}>
          {answers.map((answer, index) => (
            <div key={index} className={s.answer_item}>
              <Checkbox
                label={answer}
                className={s.check}
                checked={selectedAnswers.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          ))}
        </div>
        <Button variant="filled" onClick={handleSubmit}>Отправить</Button>
      </div>
    );
  }
  
  // Компонент для теста с type: 2
  function TestType2({ content, templateData, onSubmit }) {
    const [answers, setAnswers] = useState(Array(templateData.left.length).fill(''));
  
    const handleInputChange = (index, value) => {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[index] = value;
        return newAnswers;
      });
    };
  
    const handleSubmit = () => {
      const left = Array(templateData.left.length).fill('');
      answers.forEach((answer, index) => {
        const position = Number(answer) - 1;
        if (position >= 0 && position < templateData.left.length) {
          left[position] = templateData.left[index];
        }
      });
  
      onSubmit({
        left: left,
        right: templateData.right
      });
    };
  
    return (
      <div className={s.quiz_item}>
        <h1>{content}</h1>
        <div className={s.answer}>
          {templateData.right.map((rightItem, index) => (
            <div key={index} className={s.answer_item}>
              <p>{index + 1}. {rightItem}</p>
              <Input.Wrapper label={templateData.left[index]} description="" error="">
                <Input
                  placeholder="Введи номер"
                  value={answers[index]}
                  onChange={(event) => handleInputChange(index, event.target.value)}
                />
              </Input.Wrapper>
            </div>
          ))}
        </div>
        <Button variant="filled" onClick={handleSubmit}>Отправить</Button>
      </div>
    );
  }
  
  // Компонент для теста с type: 5
  function TestType5({ content, templateData, onSubmit }) {
    const [order, setOrder] = useState(Array(templateData.placement.length).fill(''));
  
    const handleInputChange = (index, value) => {
      setOrder((prev) => {
        const newOrder = [...prev];
        newOrder[index] = value;
        return newOrder;
      });
    };
  
    const handleSubmit = () => {
      const placements = Array(order.length).fill('');
      order.forEach((position, index) => {
        const posIndex = Number(position) - 1;
        if (posIndex >= 0 && posIndex < templateData.placement.length) {
          placements[posIndex] = templateData.placement[index];
        }
      });
  
      onSubmit({
        placement: placements
      });
    };
  
    return (
      <div className={s.quiz_item}>
        <h1>{content}</h1>
        <div className={s.answer}>
          {templateData.placement.map((item, index) => (
            <div key={index} className={s.answer_item}>
              <Input.Wrapper label={item} description="" error="">
                <Input
                  placeholder="Введи номер"
                  value={order[index]}
                  onChange={(event) => handleInputChange(index, event.target.value)}
                />
              </Input.Wrapper>
            </div>
          ))}
        </div>
        <Button variant="filled" onClick={handleSubmit}>Отправить</Button>
      </div>
    );
  }
  
  // Компонент для отображения лекции
  function Lecture({ content }) {
    return (
      <div className={s.lecture}>
        {/* <h1>Лекция</h1>
        <p>{content}</p> */}
      </div>
    );
  }
  
  export function LessonPage() {
    let { idLes } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetLessonsQuery(idLes);
    const [postLesson, { isLoading: isPosting }] = usePostLessonsMutation();
  
    useEffect(() => {
      if (data && data.lesson.type === 1) {
        postLesson({ idLes, template_data: {} });
      }
    }, [data, idLes, postLesson]);
  
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
  
    const { lesson, test } = data;
  
    const handleSubmit = async (result) => {
      try {
        await postLesson({ idLes, template_data: result });
        navigate('/applications');
        location.reload();
        alert('Ответ отправлен успешно');
      } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        alert('Ошибка при отправке данных');
      }
    };
  
    const renderContent = () => {
      if (lesson.type === 1) {
        return <Lecture content={lesson.content} />;
      }
      if (test) {
        switch (test.type) {
          case 1:
            return <TestType1 content={test.content} answers={test.template_data.answers} errorComment={test.error_comment} onSubmit={handleSubmit} />;
          case 2:
            return <TestType2 content={test.content} templateData={test.template_data} onSubmit={handleSubmit} />;
          case 5:
            return <TestType5 content={test.content} templateData={test.template_data} onSubmit={handleSubmit} />;
          default:
            return <div>Unknown test type</div>;
        }
      }
      return <div>No test data</div>;
    };
  
    return (
      <div className={s.container}>
        <div className={s.quiz}>
          <h1>{lesson.name}</h1>
          <p>{lesson.content}</p>
          {renderContent()}
        </div>
      </div>
    );
  }