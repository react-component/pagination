import '@testing-library/jest-dom';

class TestMessageChannel {
  port1 = {
    onmessage: null as ((event: MessageEvent) => void) | null,
  };

  port2 = {
    postMessage: (data: unknown) => {
      queueMicrotask(() => {
        this.port1.onmessage?.({ data } as MessageEvent);
      });
    },
  };
}

if (!globalThis.MessageChannel) {
  Object.defineProperty(globalThis, 'MessageChannel', {
    configurable: true,
    value: TestMessageChannel,
  });
}
