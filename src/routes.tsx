import { Route, Routes } from "react-router";
import { Main } from "./components/pages/main";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  )
}
