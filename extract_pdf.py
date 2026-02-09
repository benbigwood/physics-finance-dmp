import sys
from pypdf import PdfReader

sys.stdout.reconfigure(encoding='utf-8')

try:
    reader = PdfReader(r"c:\Users\benjb\OneDrive\Documents\PiS DMP\Our resources\Final Physics Behind Quantum Computers.pdf")
    text = []
    for page in reader.pages:
        text.append(page.extract_text())
    print("\n".join(text))
except Exception as e:
    print(f"Error: {e}")
