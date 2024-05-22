import SignUpForm from '@/components/autentication/signUp/signUp';

const SignUp = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://firebasestorage.googleapis.com/v0/b/crmeduca-deb5b.appspot.com/o/bgRegister.jpg?alt=media&token=5b70286f-c46d-45d8-a1a6-e931787ebb85)',
          }}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">DATAEDUCA</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Optimiza tu gestión educativa. Simplifica tu trabajo y mejora el
                rendimiento. ¡Descubre cómo puedes potenciar tu sistema de
                administración y revisar notas fácilmente!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 ">
                DATAEDUCA
              </h2>

              <p className="mt-3 text-gray-500 ">
                Registrate a nuestra plataforma{' '}
              </p>
            </div>

            <div className="mt-8">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
