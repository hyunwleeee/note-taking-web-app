export const checkIsDetailDepth = () => {
  return location.pathname.split('/').length > 2;
}
