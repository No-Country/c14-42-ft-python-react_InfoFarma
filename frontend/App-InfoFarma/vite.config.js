import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Importa el plugin react

export default defineConfig({
  resolve: {
    extensions: ['.js', '.jsx', '.node'], // Es 'extensions', no 'extensiones'
  },
  plugins: [react()], // Usa el plugin react
  optimizeDeps: {
    exclude: ['.node'], // Ignora archivos con extensión ".node"
  },
  alias: {
    // Configura la resolución de archivos ".node"
    '@swc/core-win32-x64-msvc/swc.win32-x64-msvc.node': false,
  },
  esbuild: {
    jsxFactory: 'React.createElement', // Configura el factory de JSX
    jsxFragment: 'React.Fragment', // Configura el fragment de JSX
  },
  transformReactJsx: {
    automatic: true,
  },
  loader: {
    '.js': 'jsx',
  },
});
