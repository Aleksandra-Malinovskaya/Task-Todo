import { useForm, Controller } from 'react-hook-form';
import { message, Input, Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { loginUser } from './slices/AuthSlice';
import { ROUTES } from './routes';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().min(1,'Поле обязательно для заполнения').email('Введите корректный email'),
  password: z.string().min(6,'Пароль должен быть не менее 6 символов').regex(/^(?=.*[A-Z]).*$/, 'Пароль должен содержать заглавную букву'),
})

const AuthPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(loginSchema)});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      );

      if (result.error) {
        throw new Error(result.payload);
      }

      message.success('Вход выполнен успешно');
      navigate(ROUTES.TODO);
    } catch (error) {
      message.error(error.message || 'Ошибка входа. Проверьте email и пароль');
    }
  };

  return (
    <>
      <form className="main" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>Password:</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" placeholder="password" />
            )}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an acount? <Link to={ROUTES.MAIN}>Sign up</Link>
      </p>
    </>
  );
};

export { AuthPage };
