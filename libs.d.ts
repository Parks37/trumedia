declare module "catchify" {
  function catchify<T>(value: Promise<T>): Promise<[Error | undefined, T]>;
  export default catchify;
}
