// import './App.css';  // App.css 파일은 현재 사용하지 않습니다. 주석 처리됨.

import React, { useCallback, useRef, useState } from 'react';
// React 라이브러리에서 'useCallback', 'useRef', 'useState'를 불러옵니다.

import TodoTemplate from './components/TodoTemplate';
// TodoTemplate 컴포넌트를 불러옵니다. 할 일 목록을 감싸는 템플릿 역할을 합니다.

import TodoInsert from './components/TodoInsert';
// TodoInsert 컴포넌트를 불러옵니다. 새로운 할 일을 입력받는 폼을 제공합니다.

import TodoList from './components/TodoList';
// TodoList 컴포넌트를 불러옵니다. 할 일 목록을 보여주는 역할을 합니다.

const App = () => {
  // 할 일 목록을 관리하는 상태 변수 'todos'와 해당 상태를 변경하는 함수 'setTodos'를 생성합니다.
  const [todos, setTodos] = useState([
    // 초기 상태로 세 가지 예시 할 일을 배열로 저장합니다.
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어보기',
      checked: false,
    },
  ]);

  // 새로운 할 일의 ID를 추적하기 위한 Ref 'nextId'를 생성하고 초기값을 '4'로 설정합니다.
  const nextId = useRef(4);

  // 'onInsert' 함수를 useCallback 훅을 사용하여 최적화합니다.
  const onInsert = useCallback(
    // 'text' 매개변수로 전달받은 할 일 내용을 이용하여 새로운 할 일 객체를 생성합니다.
    (text) => {
      const todo = {
        id: nextId.current, // 'nextId' 값을 새로운 할 일의 ID로 사용합니다.
        text, // 전달받은 할 일 내용을 사용합니다.
        checked: false, // 새로운 할 일은 기본적으로 '체크되지 않음' 상태입니다.
      };
      setTodos(todos.concat(todo)); // 'setTodos'를 사용하여 새로운 할 일을 기존 할 일 목록 배열에 추가합니다.
      nextId.current += 1; // 다음에 추가될 할 일의 ID를 준비하기 위해 'nextId' 값을 1 증가시킵니다.
    },
    [todos], // 'todos' 상태를 의존성으로 설정하여 최신 상태를 사용하도록 합니다.
  );

  // 'onRemove' 함수를 useCallback 훅을 사용하여 최적화합니다.
  const onRemove = useCallback(
    // 'id' 매개변수로 전달받은 할 일의 ID를 기준으로 'todos' 배열을 필터링하여 해당 할 일을 제외한 나머지 할 일들로 이루어진 새로운 배열을 만듭니다.
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id)); // 'setTodos'를 사용하여 새로운 할 일 목록 배열로 상태를 업데이트하여 선택한 할 일을 삭제합니다.
    },
    [todos], // 'todos' 상태를 의존성으로 설정하여 최신 상태를 사용하도록 합니다.
  );

  const onToggle = useCallback(
    // 'id' 매개변수로 전달받은 할 일의 ID를 기준으로 체크박스를 토글하는 함수
    (id) => {
      // 'setTodos'를 사용하여 'todos' 배열을 변경하고, 체크박스 상태를 반전시킵니다.
      setTodos(
        // 'todos' 배열을 map 함수를 사용하여 순회합니다.
        todos.map(
          (todo) =>
            // 현재 순회 중인 할 일 객체의 ID가 전달받은 'id'와 일치하는지 확인합니다.
            todo.id === id
              ? { ...todo, checked: !todo.checked } // 일치한다면 해당 할 일 객체의 'checked' 값을 반전시킵니다.
              : todo, // 일치하지 않는 경우 그대로 반환하여 기존 할 일 객체를 유지합니다.
        ),
      );
    },
    [todos], // 'todos' 상태를 의존성으로 설정하여 최신 상태를 사용하도록 합니다.
  );

  // TodoTemplate, TodoInsert, TodoList 컴포넌트를 렌더링합니다.
  return (
    <TodoTemplate>
      {/* 새로운 할 일을 입력받는 폼인 TodoInsert 컴포넌트를 렌더링하고, onInsert 함수를 props로 전달합니다. */}
      <TodoInsert onInsert={onInsert} />
      {/* 할 일 목록을 보여주는 TodoList 컴포넌트를 렌더링하고, todos 상태와 onRemove 함수를 props로 전달합니다. */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
