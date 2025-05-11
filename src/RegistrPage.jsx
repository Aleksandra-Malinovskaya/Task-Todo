import { useForm, Controller } from 'react-hook-form';
import { message, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';
import './App.css';

const RegistrPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const newPerson = {
      username: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      age: Number(data.age),
    };
    const person = {
      username: '11Aleksandra11',
      email: 'amilinovskaa@gmail.com',
      password: 'ZXCasd_123',
      gender: 'female',
      age: 21,
    };
    console.log(newPerson);
    try {
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/users/register',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPerson),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      message.success('Успешно зарегистрировано');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <form className="main" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
            render={({ field }) => <Input {...field} placeholder="Username" />}
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
