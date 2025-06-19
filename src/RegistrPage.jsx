import { useForm, Controller } from 'react-hook-form';
import { message, Input, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { registerUser } from './slices/AuthSlice';
import { ROUTES } from './routes';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const registrSchema = z.object({
  username: z.string().min(1, 'Поле обязательно для заполнения'),
  email: z.string().min(1,'Поле обязательно для заполнения').email('Введите корректный email'),
  password: z.string().min(6,'Пароль должен быть не менее 6 символов').regex(/^(?=.*[A-Z]).*$/, 'Пароль должен содержать заглавную букву'),
  gender: z.string().min(1, 'Поле обязательно для заполнения'),
  age: z.coerce.number().min(18,'Возраст должен быть не менее 18 лет').int('Возраст должен быть целым числом').positive('Возраст должен быть положительным'),
})

const RegistrPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(registrSchema),
  defaultValues:{
    username: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  }});
  async function onSubmit(data) {
    try {
      const result = await dispatch(registerUser(data));

      if (result.error) {
        throw new Error(result.payload);
      }

      message.success('Регистрация прошла успешно!');
      navigate(ROUTES.TODO);
    } catch (error) {
      message.error(error.message || 'Ошибка регистрации');
    }
  }

  return (
    <>
      <form className="main" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input {...field} placeholder="username" />}
          />
          <p>{errors.name?.message}</p>
        </div>
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
        <div className="gender">
          <label>Gender: </label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio className="custom-radio" value="male">
                  Male
                </Radio>
                <Radio className="custom-radio" value="female">
                  Female
                </Radio>
              </Radio.Group>
            )}
          />
          <p>{errors.gender?.message}</p>
        </div>
        <div>
          <label>Age:</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Input type="number" {...field} placeholder="Age" />
            )}
          />
          <p>{errors.age?.message}</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an acount?<Link to={ROUTES.AUTH}>Log in</Link>
      </p>
    </>
  );
};

export { RegistrPage };
