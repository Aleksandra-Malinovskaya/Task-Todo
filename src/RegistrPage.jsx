import { useForm, Controller } from 'react-hook-form';
import { message, Input, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import { registerUser } from './slices/AuthSlice';

const RegistrPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    try {
      const result = await dispatch(registerUser(data));

      if (result.error) {
        throw new Error(result.payload);
      }

      message.success('Регистрация прошла успешно!');
      navigate('/todoList');
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
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
            render={({ field }) => <Input {...field} placeholder="username" />}
          />
          <p>{errors.name?.message}</p>
        </div>
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
        <div className="gender">
          <label>Gender: </label>
          <Controller
            name="gender"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
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
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
            render={({ field }) => (
              <Input type="number" {...field} placeholder="Age" />
            )}
          />
          <p>{errors.age?.message}</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an acount?<Link to="/authorization">Log in</Link>
      </p>
    </>
  );
};

export { RegistrPage };
