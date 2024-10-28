import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Загрузка...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 10));
      setMessage('Оценка работы...');
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessage('Просчитывание багов...');
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessage('Оценка фронтенда...');
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessage('Проверка API...');
      await new Promise((resolve) => setTimeout(resolve, 20));

      const response = await fetch('http://localhost:8080/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ url }),
      });

      if (!response.ok) {
        throw new Error('Ошибка на сервере');
      }

      const text = await response.text();
      setMessage(text);
    } catch (error) {
      setMessage('Произошла ошибка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Проверка сайта</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="url">Введите URL вашего сайта:</label><br />
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <button type="submit" style={styles.button} disabled={loading}>
          Отправить
        </button>
      </form>

      {loading ? <p>{message}</p> : <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '300px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default App;
