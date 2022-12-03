import { ReactNode } from 'react';

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center w-full">
      <main className="pt-16 max-w-4xl w-[896px] bg-white">{children}</main>
    </div>
  );
};

export default Container;
