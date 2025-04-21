import { DriveUI } from "~/components/drive-ui"
import { ThemeProvider } from "~/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <DriveUI />
    </ThemeProvider>
  )
}
