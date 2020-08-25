#!/usr/bin/python3

import logging 
import os

def setup_logger(logs_path: str, port : str) -> logging.Logger:
  logger = logging.getLogger("Engine")
  logger.setLevel(logging.INFO)
  # logger_file_handler = logging.FileHandler("%s/engine-%s-%s.log" % (logs_path, port, str(os.getpid())))
  logger_file_handler = logging.FileHandler("%s/engine-%s.log" % (logs_path, port))
  default_formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s", "%d/%m/%Y %H:%M:%S")
  logger_file_handler.setFormatter(default_formatter)
  logger.addHandler(logger_file_handler)

  return logger


def get_logger() -> logging.Logger:
  return logging.getLogger("Engine")