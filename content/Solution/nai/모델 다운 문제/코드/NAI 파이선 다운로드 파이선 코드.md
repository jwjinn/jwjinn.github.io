
- 찾는 법
```python

# python3 -c "import os; print(os.listdir('generate'))"
['hf_format.py', 'nim_format.py', 'utils']

# python3 -c "print(open('generate/hf_format.py', 'r').read())"

```

```python

"""

This module downloads model files and generates model in HF OutputFormat.

  

Attributes:

    DOWNLOAD_DIR (str): model-files directory inside output mount

"""

  

import os

from utils.generate_data_model import GenerateDataModel

from utils.errors import handle_invalid_provider

from utils.download_monitor import DownloadMonitor

  

DOWNLOAD_DIR = "model-files"

HF_CACHE_DIR = "hf_cache"

HF_SUPPORTED_PROVIDERS = {"HUGGING_FACE": "hf", "NFS": "nfs", "S3": "s3"}

  

  

def run_huggingface(

    gen_model: GenerateDataModel, download_dir: str, hf_cache_dir: str

) -> None:

    """

    Run Hugging Face model process operations using the provided GenerateDataModel instance.

  

    Args:

        gen_model (GenerateDataModel): An instance of the GenerateDataModel class.

    """

    gen_model.hf_utils.validate_info()

    gen_model.hf_utils.run_download(

        download_path=download_dir,

        hf_cache_path=hf_cache_dir,

    )

  

  

def run_nfs(gen_model: GenerateDataModel, destination: str) -> None:

    """

    Run NFS model process operations using the provided GenerateDataModel instance.

  

    Args:

        gen_model (GenerateDataModel): An instance of the GenerateDataModel class.

    """

    source = gen_model.nfs_utils.validate_and_get_source()

    gen_model.nfs_utils.copy_to_dst(source, destination)

  

  

def run_s3(gen_model: GenerateDataModel, download_dir: str) -> None:

    """

    Run S3 Object model process operations using the provided GenerateDataModel instance.

  

    Args:

        gen_model (GenerateDataModel): An instance of the GenerateDataModel class.

    """

    gen_model.s3_utils.set_s3_client()

    gen_model.s3_utils.download_from_bucket(download_dir)

  

  

def main():

    """

    This function initializes GenerateDataModel for HF OutputFormat.

    It supports Hugging Face, NFS, S3 providers

  

    Args:

        gen_model (GenerateDataModel): An instance of the GenerateDataModel dataclass

    Raises:

        sys.exit(1): Terminate the program with an exit code of 1

    """

    gen_model = GenerateDataModel()

  

    if gen_model.provider not in HF_SUPPORTED_PROVIDERS.values():

        handle_invalid_provider(gen_model.provider, gen_model.output_format)

  

    download_dir = os.path.join(gen_model.output_mount, DOWNLOAD_DIR)

    hf_cahe_dir = os.path.join(gen_model.output_mount, HF_CACHE_DIR)

  

    download_monitor = DownloadMonitor(download_dir)

    download_monitor.start()

  

    if gen_model.provider == HF_SUPPORTED_PROVIDERS["HUGGING_FACE"]:

        run_huggingface(gen_model, download_dir, hf_cahe_dir)

    elif gen_model.provider == HF_SUPPORTED_PROVIDERS["NFS"]:

        run_nfs(gen_model, download_dir)

    elif gen_model.provider == HF_SUPPORTED_PROVIDERS["S3"]:

        run_s3(gen_model, download_dir)

  

    download_monitor.stop()

```