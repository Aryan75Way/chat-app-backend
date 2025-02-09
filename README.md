## Running Locally

> [!NOTE]  
> This project uses [pnpm](https://pnpm.io/) only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/iAryanK/gosssip-backend.git
```

2. Navigate to the project directory:

```bash
cd ./gosssip
```

3. Create a .env.production file & Copy the below environment variables to `.env.development`.

```bash
PORT = 3000
NODE_ENV = "development"
FE_BASE_URL = "http://localhost:3001/"
```

4. Install dependencies:

```bash
pnpm install
```

5. Start the development server:

```bash
pnpm dev
```

6. Access the application in your browser:

```bash
http://localhost:3000
```
