# Environment Setup

1. **Clone the Repository**

```zsh
git clone https://gitlab.com/tab.erd.tsedensodnom/todo-front.git
```

2. **Install Dependencies**

```zsh
yarn
```

3. **Configure Environment Variables**

```zsh
cp .env.development .env.local
```

4. **Start the Docker Container**

```zsh
yarn dev
```

# Prettier & Linting Code

```zsh
yarn prettier --write . && yarn lint:eslint --fix && yarn && yarn build
```
