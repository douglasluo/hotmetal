using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TestAPI : MonoBehaviour {
	public Text stepIndicator;
	public GameObject btnStep2;

	public void Test() {
		NetworkManager.Instance.gradeSAI ("button1", "ButtonPressed", "click");
	}

	public void FinishStep0() {
		NetworkManager.Instance.gradeSAI ("step", "Step0Finished", "-1");
	}

	public void FinishStep1() {
		NetworkManager.Instance.gradeSAI ("step", "Step1Finished", "-1");
	}

	void Start() {
		NetworkManager.Instance.setStep += setStepHandler;
		btnStep2.SetActive (false);
	}

	void setStepHandler(string step) {
		stepIndicator.text = "Step: " + step;
		if (step == "step1") {
			btnStep2.SetActive (true);
		}
	}
}
