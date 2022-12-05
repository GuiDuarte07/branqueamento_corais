import Image from 'next/image';
import { ReactNode } from 'react';

const Container: React.FC<{ children: ReactNode; home?: true }> = ({
  children,
  home,
}) => {
  return (
    <div className="flex justify-center w-full flex-col items-center">
      {home && (
        <div className="relative w-full h-32 md:h-60">
          <Image
            className="h-auto object-cover"
            alt="branqueamento de corais"
            src="/images/bran_corais2.jpg"
            fill
          ></Image>
        </div>
      )}
      <main className="pt-6 w-full lg:w-[896px] xl:w-[1152px] bg-white flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Container;
