import "@zeppos/device-types/dist/index.d.ts";
import "zosx/zosx_module.d.ts";
import "zosx/declare_bundle";

declare global {
  const hmUI: any;
  const hmFS: any;
  function App(config: any): void;
  function Page(config: any): void;
}

export {};
