declare module "vanta/dist/vanta.trunk.min" {
  const TRUNK: (opts: Record<string, unknown>) => { destroy: () => void };
  export default TRUNK;
}
