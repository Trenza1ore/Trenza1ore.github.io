---
title: "RAM expansions are overrated, just compress your observations!"
date: 2025-07-28
draft: false
tags: ["Reinforcement Learning", "Stable Baselines3", "Compression", "Memory Optimization", "Open Source"]
---
I'm excited to share that my project **sb3-extra-buffers** has been featured in the official Stable Baselines3 documentation! This small but powerful library addresses a common pain point in Reinforcement Learning: the massive memory consumption of replay and rollout buffers when working with image-based observations.

![Banner Image](https://github.com/user-attachments/assets/e6e5cd2f-55d4-4686-abf7-773148d80ad2)

## The Problem: Memory-Hungry RL Buffers

Reinforcement learning is often considered memory-hungry due to the enormous amount of RAM required to store replay and rollout buffers. When you read a cool RL paper and try to reproduce their results, you might find yourself needing to store **millions** of observations in memory. This becomes especially problematic when working with:

- **Atari games** (210×160 RGB frames)
- **ViZDoom environments** (game frames or Semantic Segmentation masks)
- **Robotics applications** (high-resolution camera inputs)
- **Semantic Segmentation masks** (class labels with large contiguous regions)

Traditional approaches often involve buying more RAM either directly or indirectly. But what if we could solve this with highly vectorized lossless compression instead?

## The Solution: Compressed Buffers

The idea behind `sb3-extra-buffers` is simple but effective: **compress the observations in memory buffers while introducing minimal overhead**. The library provides drop-in replacements for Stable Baselines3's standard `ReplayBuffer` and `RolloutBuffer` classes.

### Supported Compression Methods

- `rle` Vectorized Run-Length Encoding for compression.
- `rle-jit` JIT-compiled version of `rle`, uses [numba](https://numba.pydata.org) library.
- `gzip` Built-in gzip compression via `gzip`.
- `igzip` Intel accelerated variant via `isal.igzip`, uses [python-isal](https://github.com/pycompression/python-isal) library.
- **`zstd`** Zstandard compression via [python-zstd](https://github.com/sergey-dryabzhinsky/python-zstd). **(Recommended)**
- `lz4-frame` LZ4 (frame format) compression via [python-lz4](https://github.com/python-lz4/python-lz4).
- `lz4-block` LZ4 (block format) compression via [python-lz4](https://github.com/python-lz4/python-lz4).

### Why RLE for Semantic Segmentation?

The project actually started with Run-Length Encoding for Semantic Segmentation masks, an idea that sparked during my MSc thesis. As mentioned in my [GitHub issue](https://github.com/Stable-Baselines-Team/stable-baselines3-contrib/issues/298), RLE is particularly effective for data with large contiguous regions of repeating values.

In my early testing with ViZDoom deathmatches:
- **RGB game frames**: ~11GB
- **Semantic segmentation masks**: ~3.6GB
- **RLE-compressed SS masks**: ~150MB

That's a **98%+ reduction** in memory usage!

## How It Works

The implementation uses a NumPy array of objects to store compressed bytes, which can be efficiently loaded back using NumPy's `frombuffer` function after decompression. The decompressed arrays are read-only, but since for most training a GPU device hosts the RL agents' weights, copying is always required and is hardly a bottleneck anyway.

### Simple Setup

The beauty of `sb3-extra-buffers` is its simplicity. It's designed as a drop-in replacement:

```python
# Instead of the standard buffer
from stable_baselines3.common.buffers import ReplayBuffer

# Use the compressed version
from sb3_extra_buffers.compressed import CompressedReplayBuffer
```

## Performance Benchmarks

Early benchmarks on MsPacman-NoFrameskip-v4 show **90%+ memory savings** with minimal added latency. The compression overhead is negligible compared to the massive memory benefits.

### Recommended Compression Setting

`zstd-5`: ZStandard at compression level -5, saving often 95%+ memory with negligible overhead.

## Real-World Applications

### ViZDoom with Semantic Segmentation

One of the most compelling use cases is training RL agents on ViZDoom using Semantic Segmentation masks. As demonstated in [Exploiting semantic segmentation to boost reinforcement learning in video game environments](https://link.springer.com/article/10.1007/s11042-022-13695-1) for the 2D game of Mario Bros, Semantic Segmentation is quite effective as an input format for RL.

Semantic Segmentation provides rich spatial information while being highly compressible. My [postgrad thesis](https://github.com/Trenza1ore/SegDoom) applied SS to the training of Doom-play RL agents, it was demonstrated that SS can act as a valid replacement to RGB with low performance loss and a good augmentation to RGB for boosting performance much further.

### Atari Games

For Atari environments, compressed buffers allow you to store much larger replay buffers without upgrading your hardware. This is especially valuable for algorithms that benefit from large replay buffers like DQN variants.

### Robotics and Computer Vision

In robotics applications with high-resolution camera inputs, compressed buffers can make the difference between running experiments locally or requiring expensive cloud instances.

## Future Development

The project is actively maintained with exciting features planned:

### Version 0.4.x
- Improving save/load mechanisms (if it can?)
- Start work on device-independant buffers via `torch.UntypedStorage`

### Version 0.5.x
- Implementing on-GPU compressed buffers for even better performance
- This will be particularly beneficial for training on high-end GPUs

## Getting Started

The library is available on PyPI and can be installed with (`fast` option also installs support for additional compression methods):

```bash
pip install "sb3-extra-buffers[fast]"
```

### Quick Example

```python
from stable_baselines3 import PPO
from sb3_extra_buffers.training_utils.atari import make_env
from sb3_extra_buffers.compressed import CompressedRolloutBuffer, find_buffer_dtypes

# Get the shape of observation and find the most suitable data types
compression = "zstd-5"  # use ZStandard with -5 compression level
obs = make_env(env_id="PongNoFrameskip-v4", n_envs=1, framestack=4).observation_space
buffer_dtypes = find_buffer_dtypes(
    obs_shape=obs.shape, elem_dtype=obs.dtype, compression_method=compression
)

# Create environment
env = make_env(env_id=ATARI_GAME, n_envs=8, framestack=4)

# Create PPO model with CompressedRolloutBuffer
model = PPO(..., 
    rollout_buffer_class=CompressedRolloutBuffer,
    rollout_buffer_kwargs=dict(dtypes=buffer_dtypes, compression_method=compression)
)

# Train as usual
model.learn(total_timesteps=1000000)
```

## Community and Feedback

The project is open source and welcomes contributions! Whether you're:
- Reporting bugs
- Suggesting new compression methods
- Contributing code
- Sharing use cases

Feel free to reach out through [GitHub issues](https://github.com/Trenza1ore/sb3-extra-buffers/issues) or discussions.

## Conclusion

`sb3-extra-buffers` demonstrates that sometimes... well I don't know what does it demonstrate, but it's a cool and useful tool that I wish I had when working on my Undergrad / Postgrad thesis. It's all about making RL research more accessible to the general audience: students, hobbiests, researches just starting out. Anyone without big RAM / VRAM budgets should still be able to play with RL and enjoy the happiness of seeing an AI playing Doom or Pong.

### Links

- **SB3 Documentation**: [Project page](https://stable-baselines3.readthedocs.io/en/master/misc/projects.html#sb3-extra-buffers-ram-expansions-are-overrated-just-compress-your-observations)
- **PyPI Package**: [sb3-extra-buffers](https://pypi.org/project/sb3-extra-buffers/)
- **GitHub Repository**: [Trenza1ore/sb3-extra-buffers](https://github.com/Trenza1ore/sb3-extra-buffers)
- **Related Project**: [SegDoom](https://github.com/Trenza1ore/SegDoom) - Training RL agents on Doom with Semantic Segmentation

Happy coding, and may your memory buffers be ever compressed! 🚀 