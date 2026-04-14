type TourPackageLinkable = {
  id: number | string;
  name: string;
};

export const toTourPackageSlug = (name: string) => {
  return String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const getTourPackageHref = (pkg: TourPackageLinkable) => {
  const slug = toTourPackageSlug(pkg.name);
  return `/packages/${slug || pkg.id}`;
};
