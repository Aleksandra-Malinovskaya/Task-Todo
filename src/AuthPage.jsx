import { useForm, Controller } from 'react-hook-form';
import { message, Input, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const AuthPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const authPerson = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authPerson),
        }
      );

      const result = await response.json();
      const token = result.token;

      if (token) {
        localStorage.setItem('token', token);
        message.success('Вход выполнен успешно');
        navigate('/todoList');
      } else {
        throw new Error(result.message || 'Токен не найден');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <form className="main" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
              pattern: {
                value: /^(?=.*[A-Z]).*$/,
                message:
                  'Пароль должен содержать как минимум одну заглавную букву',
              },
            }}
            render={({ field }) => (
              <Input {...field} type="password" placeholder="password" />
            )}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an acount? <Link to="/">Sign up</Link>
      </p>
    </>
  );
};

export { AuthPage };
