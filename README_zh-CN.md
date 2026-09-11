# Beyond Code

[![skills.sh](https://skills.sh/b/Celec7/beyond-code)](https://skills.sh/Celec7/beyond-code)

实用、简洁的 AI 编程辅助技能集。管住 AI 乱改代码、偷工减料、乱打补丁与文档淤泥。

[English](README.md) | 中文

## 为什么需要这个？

让 AI 帮我们写代码很方便，但用过的人都知道，AI 经常会犯几个让人头疼的老毛病：

1. **想当然与过度设计**：没搞清楚这次明确**不该做什么**，就自作主张写了一大堆用不上的复杂抽象。
2. **手脚不干净，越界乱改**：让它改一个简单功能，它顺手把不相干的文件、公共接口甚至依赖库全改了。
3. **创可贴式修 Bug**：遇到报错或空指针，不去查是谁传过来的脏数据，而是在报错的地方加 `?.`、加 `if (!x) return` 或者用空 `catch` 吞掉报错糊弄过去。
4. **偷懒与测试作弊**：写长任务时偷偷留 `// TODO`、写个空函数占位，甚至把测试断言改弱、造个假数据让测试变绿。
5. **文档乱写与淤泥堆积**：把临时任务清单、历史重构流水账、虚假的未来计划写进仓库文档，导致文档迅速腐烂失效。

我们不需要复杂的流程框架，也不想让 AI 天天在仓库里建临时目录、填格式化表单。

这里提供 5 个独立、实用的小技能，各管一件事，在关键节点看住 AI，交付干净可靠的代码与长效文档。

## 5 个核心技能

| 技能 | 什么时候用 |
| :--- | :--- |
| **[`scope-guard`](skills/scope-guard/SKILL.md)** | 梳理需求时，或者这个需求比它该改的东西大得多 |
| **[`implementation-bounds`](skills/implementation-bounds/SKILL.md)** | 动手写代码前，或者改动已经越出圈定的文件范围 |
| **[`root-cause-debugging`](skills/root-cause-debugging/SKILL.md)** | 测试挂了、代码报错、结果不对，或者同一个 Bug 反复出现 |
| **[`code-integrity-audit`](skills/code-integrity-audit/SKILL.md)** | 准备说做完了、准备提交、或者准备提 PR 时 |
| **[`canonical-docs`](skills/canonical-docs/SKILL.md)** | 编写或审查 `docs/`，或者文档和代码已经对不上了 |

## 安装

安装所有技能到你的 Agent（Claude Code, Codex, DSH, Cursor 等）：

```bash
npx skills add Celec7/beyond-code
```

也可以按需挑选单个技能使用。

## 日常怎么用？

每个技能都是独立的，平时不需要你特意背诵命令，你可以随时唤起，也可以让 AI 自主触发：

- **准备做新功能时**：让它用 `scope-guard` 先对齐这次**不做什么**，以及有哪些关键技术选择需要你定夺；
- **AI 动手改代码时**：用 `implementation-bounds` 限制它只动这几个文件，防止它把整个代码库改花了；
- **代码跑崩了的时候**：提醒它用 `root-cause-debugging` 去查数据来源，别在报错行随手糊一个 `?.` 应付差事；
- **准备交差前**：让它用 `code-integrity-audit` 拿着放大镜查一遍自己写的 diff，确保没留未实现的 TODO，测试都是真实跑通的；
- **沉淀或更新系统架构时**：让它用 `canonical-docs` 维护 `docs/`，确保写下的每一句都是当前代码库真实的客观契约，绝不混入临时工单和陈旧废话。

## 开源协议

[MIT](LICENSE)
