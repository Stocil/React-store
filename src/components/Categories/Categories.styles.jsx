import { Skeleton, Stack, Typography, styled } from "@mui/material";

export const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  textAlign: "center",

  [theme.breakpoints.down("ss")]: {
    fontSize: "2.5rem",
  },
}));

export const CategoryInner = styled(Stack)(({ theme }) => ({
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: "15px",
  width: "150px",
  height: "150px",
  textAlign: "center",

  transition: `background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },

  [theme.breakpoints.down("lg")]: {
    width: "135px",
    height: "135px",
  },

  [theme.breakpoints.down("md")]: {
    width: "250px",
    height: "120px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "200px",
  },

  [theme.breakpoints.down("ss")]: {
    width: "280px",
    height: "50px",
  },
}));

export function LoadingCategory({ count = 1 }) {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push(
      <Skeleton key={i} variant="rounded" width={150} height={150}></Skeleton>
    );
  }

  return products;
}

export const CategoriesInner = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-around",
  gap: 8,
  marginTop: 40,
  borderTop: `2px solid ${theme.palette.primary.dark}`,
  borderBottom: `2px solid ${theme.palette.primary.dark}`,
  padding: "50px 0",

  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
    gap: theme.spacing(2),
  },
}));
