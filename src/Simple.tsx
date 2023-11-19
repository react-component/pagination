import * as React from 'react';

export interface SimpleProps {
  slogan?: React.ReactNode;
}

function Simple(props: React.PropsWithChildren<SimpleProps>) {
  const { children } = props;

  return (
    <>
      <div className="my-slogan">
        <p>魔法师正在进行最后的仪式，为您带来一项惊艳功能</p>
        <strong>TBD:</strong>
        <i>To Be Determined...</i>
      </div>
      {children}
      <code hidden>src/Simple.tsx</code>
    </>
  );
}

export default Simple;
