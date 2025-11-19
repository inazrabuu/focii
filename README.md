# FOCII

An open-source bot central hub that connects your applications to any messaging platform through a single unified API. Instead of building separate integrations for Slack, Discord, Telegram, WhatsApp, and other services, you build once with Focii and communicate everywhere. The platform handles all the platform-specific complexities, message routing, and real-time communication, letting you focus on your core bot logic rather than integration details.

As an open-source project, Focii serves as both a production-ready bot platform and a customizable template for developers to build upon. You can use it as-is for your messaging needs or fork and extend it to create specialized bot frameworks, custom platform adapters, or enterprise communication solutions. The codebase is designed to be modular and extensible, making it easy to contribute new features or adapt it to unique use cases.

## Quick Setup
```shell
# Clone and setup
git clone https://github.com/inazrabuu/focii.git
cd focii
npm install

# Configure your environment
cp .env-example .env
# Edit .env with your platform tokens

# Start developing
npm run dev
```

Focii will be running at `http://localhost:3000` and ready to connect to any configured messaging platforms.