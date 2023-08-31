interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid h-full w-full place-items-center bg-blue-200">
      {children}
    </div>
  );
};

export default AuthLayout;
