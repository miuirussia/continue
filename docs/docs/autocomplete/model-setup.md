---
title: Model setup
description: Autocomplete \-model setup
keywords: [model, autocomplete]
sidebar_position: 2
---

:::info
This page recommends models and providers for Autocomplete. Read more about how to set up your `config.json` [here](../reference.md).
:::

## Best overall experience

For the best Autocomplete experience, we recommend using Codestral through the [Mistral API](https://console.mistral.ai/). This model offers high-quality completions with an excellent understanding of code context:

```json title="config.json""
{
  "tabAutocompleteModel": {
    "title": "Codestral",
    "provider": "mistral",
    "model": "codestral-latest",
    "apiKey": "YOUR_API_KEY"
  }
}
```

:::tip[Codestral API Key]
The API keys for Codestral and the general Mistral APIs are different. If you are using Codestral, you probably want a Codestral API key, but if you are sharing the key as a team or otherwise want to use `api.mistral.ai`, then make sure to set `"apiBase": "https://api.mistral.ai/v1"` in your `tabAutocompleteModel`.
:::

## Local, offline / self-hosted experience

For those preferring local execution or self-hosting,`Qwen2.5-Coder 1.5B` offers a good balance of performance and quality for most users (e.g. using [Ollama](../customize/model-providers/top-level/ollama.md) or [LM Studio](../customize/model-providers/more/lmstudio.md)).

```json title="config.json""
{
  "tabAutocompleteModel": {
    "title": "Qwen2.5-Coder 1.5B",
    "model": "qwen2.5-coder:1.5b-base",
    "provider": "ollama"
  }
}
```

Have more compute? Use `qwen2.5-coder:7b-base` for potentially higher-quality suggestions.

:::note

For LM Studio users, navigate to the "My Models" section, find your desired model, and copy the path (e.g., `Qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/qwen2.5-coder-1.5b-instruct-q4_k_m.gguf`). Use this path as the `model` value in your configuration.

:::
### Using a remote instance

When using a remote instance you need to set the `"apiBase"` value in the configuration:

```json title="config.json""
{
  "tabAutocompleteModel": {
    "title": "Qwen2.5-Coder 1.5B",
    "model": "qwen2.5-coder:1.5b-base",
    "provider": "ollama"
    "apiBase": "http://<my endpoint>:11434"
  }
}
```
## Other experiences

There are many more models and providers you can use with Autocomplete. Check them out [here](../customize/model-types/autocomplete.md). You can also see more examples of Autocomplete configuration [here](../customize/deep-dives/autocomplete.md)